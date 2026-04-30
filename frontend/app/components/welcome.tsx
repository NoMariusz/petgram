export function Welcome() {
	return (
		<main className='min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(244,66,80,0.18),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(255,181,74,0.18),_transparent_28%),linear-gradient(180deg,_#fffdfb_0%,_#fff8f3_42%,_#ffffff_100%)] text-slate-900'>
			<div className='mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 lg:px-10'>
				<header className='flex items-center justify-between gap-4 border-b border-black/5 pb-6'>
					<div>
						<p className='text-xs font-semibold uppercase tracking-[0.35em] text-[#f44250]'>
							Petgram
						</p>
						<h1 className='mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl'>
							Społeczność zbudowana wokół zwierząt
						</h1>
					</div>
					<a
						href='#overview'
						className='rounded-full border border-slate-900/10 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-[#f44250]/30 hover:text-[#f44250]'
					>
						Zobacz założenia
					</a>
				</header>

				<section className='grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-16'>
					<div className='space-y-8'>
						<div className='inline-flex items-center gap-2 rounded-full border border-[#f44250]/15 bg-white/80 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur'>
							<span className='h-2.5 w-2.5 rounded-full bg-[#f44250]' />
							Feed pionowy, profile pupili i treści tylko o
							zwierzętach
						</div>

						<div className='space-y-5'>
							<h2 className='max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl'>
								Miejsce, w którym zdjęcia i filmy pupili są w
								centrum uwagi.
							</h2>
							<p className='max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl'>
								Petgram porządkuje wspomnienia, wspiera
								odkrywanie konkretnych ras i gatunków oraz daje
								przestrzeń do budowania społeczności wokół
								opieki nad zwierzętami.
							</p>
						</div>

						<div className='flex flex-col gap-3 sm:flex-row'>
							<a
								href='#overview'
								className='inline-flex items-center justify-center rounded-full bg-[#f44250] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(244,66,80,0.25)] transition hover:-translate-y-0.5 hover:bg-[#df3442]'
							>
								Przejdź do przeglądu
							</a>
							<a
								href='#structure'
								className='inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-900/20'
							>
								Proponowana struktura
							</a>
						</div>

						<div className='grid gap-4 sm:grid-cols-3'>
							{stats.map((stat) => (
								<div
									key={stat.label}
									className='rounded-3xl border border-slate-900/6 bg-white/85 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur'
								>
									<p className='text-3xl font-semibold tracking-tight text-slate-950'>
										{stat.value}
									</p>
									<p className='mt-2 text-sm leading-6 text-slate-600'>
										{stat.label}
									</p>
								</div>
							))}
						</div>
					</div>

					<div className='relative' id='overview'>
						<div className='absolute -left-8 top-10 hidden h-24 w-24 rounded-full bg-[#f44250]/15 blur-2xl lg:block' />
						<div className='absolute -right-6 bottom-8 hidden h-28 w-28 rounded-full bg-[#ffb54a]/20 blur-2xl lg:block' />

						<div className='relative overflow-hidden rounded-[2rem] border border-slate-900/8 bg-slate-950 p-5 text-white shadow-[0_32px_90px_rgba(15,23,42,0.24)]'>
							<div className='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,66,80,0.28),_transparent_35%),linear-gradient(180deg,_rgba(255,255,255,0.04),_transparent)]' />
							<div className='relative space-y-4'>
								<div className='flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 backdrop-blur'>
									<div>
										<p className='text-xs uppercase tracking-[0.25em] text-white/60'>
											Feed
										</p>
										<p className='mt-1 text-sm text-white/90'>
											Pionowe przewijanie i szybkie
											przejścia między materiałami
										</p>
									</div>
									<div className='rounded-full bg-[#f44250] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white'>
										Live
									</div>
								</div>

								<div className='grid gap-4 sm:grid-cols-[1.15fr_0.85fr]'>
									<article className='rounded-[1.75rem] bg-white p-4 text-slate-950 shadow-lg shadow-black/10'>
										<div className='aspect-[4/5] rounded-[1.4rem] bg-[linear-gradient(180deg,_#fff3e8,_#ffd8cb_55%,_#f44250)] p-4'>
											<div className='flex h-full flex-col justify-between rounded-[1.1rem] border border-white/60 bg-white/55 p-4 backdrop-blur-sm'>
												<div className='flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-600'>
													<span>Profil pupila</span>
													<span>Weryfikacja</span>
												</div>
												<div>
													<p className='text-2xl font-semibold tracking-tight'>
														Luna • border collie
													</p>
													<p className='mt-2 max-w-sm text-sm leading-6 text-slate-700'>
														Oś czasu, tagi, opis i
														posty zgrupowane w
														jednym profilu.
													</p>
												</div>
											</div>
										</div>
									</article>

									<div className='space-y-4'>
										{highlights.map((item) => (
											<div
												key={item.title}
												className='rounded-[1.5rem] border border-white/10 bg-white/8 p-4 backdrop-blur'
											>
												<p className='text-sm font-semibold text-white'>
													{item.title}
												</p>
												<p className='mt-2 text-sm leading-6 text-white/72'>
													{item.description}
												</p>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section
					id='structure'
					className='grid gap-4 border-t border-black/5 py-10 md:grid-cols-3'
				>
					{sections.map((section) => (
						<article
							key={section.title}
							className='rounded-[1.5rem] border border-slate-900/8 bg-white/85 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)]'
						>
							<p className='text-sm font-semibold uppercase tracking-[0.25em] text-[#f44250]'>
								{section.kicker}
							</p>
							<h3 className='mt-3 text-xl font-semibold tracking-tight text-slate-950'>
								{section.title}
							</h3>
							<p className='mt-3 text-sm leading-6 text-slate-600'>
								{section.description}
							</p>
						</article>
					))}
				</section>
			</div>
		</main>
	);
}

const stats = [
	{
		value: 'Feed',
		label: 'Pionowe przewijanie z naciskiem na szybkie odkrywanie treści.',
	},
	{
		value: 'Pupile',
		label: 'Oddzielne profile zwierząt z metryczką i historią postów.',
	},
	{
		value: 'Odkrywaj',
		label: 'Wyszukiwanie po tagach, gatunkach, rasach i lokalizacji.',
	},
];

const highlights = [
	{
		title: 'Treści tylko o zwierzętach',
		description:
			'Platforma ma pozostać skupiona na opiece, edukacji i społeczności wokół pupili.',
	},
	{
		title: 'Dokumentowanie pupili',
		description:
			'Każde zwierzę dostaje własny profil, metryczkę, bio i grupowanie postów.',
	},
	{
		title: 'Wyszukiwanie i filtracja',
		description:
			'Odkrywanie treści po tagach, rasach, gatunkach oraz lokalizacji użytkownika.',
	},
];

const sections = [
	{
		kicker: 'Routes',
		title: '/routes',
		description:
			'Strony i widoki aplikacji, np. feed, profile, odkrywaj, post details.',
	},
	{
		kicker: 'UI',
		title: '/components',
		description:
			'Wspólne elementy interfejsu: przyciski, karty postów, nagłówki, modale.',
	},
	{
		kicker: 'Logic',
		title: '/hooks',
		description:
			'Powtarzalna logika: pobieranie feedu, wyszukiwanie, interakcje i stan.',
	},
];