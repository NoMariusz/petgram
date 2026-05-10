package com.petgram.petgrambackend.config;

import com.petgram.petgrambackend.entity.UserEntity;
import com.petgram.petgrambackend.repository.RevokedTokenRepository;
import com.petgram.petgrambackend.repository.UsersRepository;
import com.petgram.petgrambackend.service.JwtService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtService jwtService;
	private final UsersRepository usersRepository;
	private final RevokedTokenRepository revokedTokenRepository;

	public JwtAuthenticationFilter(
			JwtService jwtService,
			UsersRepository usersRepository,
			RevokedTokenRepository revokedTokenRepository
	) {
		this.jwtService = jwtService;
		this.usersRepository = usersRepository;
		this.revokedTokenRepository = revokedTokenRepository;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authorizationHeader = request.getHeader("Authorization");
		if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}

		String token = authorizationHeader.substring(7);
		try {
			if (!jwtService.isTokenValid(token)) {
				filterChain.doFilter(request, response);
				return;
			}

			String tokenId = jwtService.extractTokenId(token);
			if (tokenId != null && revokedTokenRepository.existsByTokenId(tokenId)) {
				filterChain.doFilter(request, response);
				return;
			}

			String username = jwtService.extractSubject(token);
			Optional<UserEntity> maybeUser = usersRepository.findByUsername(username);
			if (maybeUser.isEmpty()) {
				filterChain.doFilter(request, response);
				return;
			}

			UserEntity user = maybeUser.get();
			if (!Boolean.TRUE.equals(user.getIsActive())) {
				filterChain.doFilter(request, response);
				return;
			}

			if (SecurityContextHolder.getContext().getAuthentication() == null) {
				String roleName = user.getRole() == null ? "USER" : user.getRole().getName();
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						user.getUsername(),
						null,
						List.of(new SimpleGrantedAuthority("ROLE_" + roleName))
				);
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		} catch (JwtException | IllegalArgumentException ignored) {
			SecurityContextHolder.clearContext();
		}

		filterChain.doFilter(request, response);
	}
}
