export interface ApiError {
	error: string;
}

export interface UserProfilePetResponse {
	id: number;
	name: string;
	profilePictureUrl: string;
}

export interface UserPinnedPostResponse {
	id: number;
	text: string;
	postPictureUrl: string;
	creatorName: string;
	likesCount: number;
}

export interface UserDataResponse {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	bio: string;
	profilePictureUrl: string;
	location: string;
	website: string;
	role: string;
	active: boolean;
	verified: boolean;
}

export interface UserProfileResponse {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	bio: string;
	profilePictureUrl: string;
	location: string;
	role: string;
	pets: UserProfilePetResponse[];
	pinnedPost: UserPinnedPostResponse | null;
	isFollowed: boolean;
	postsCount: number;
	followersCount: number;
	followingCount: number;
	isOwnProfile: boolean;
}

export interface PostListItem {
	id: number;
	text: string;
	postPictureUrl: string;
	creatorName: string;
	createdAt: LocalDateTime;
	likesCount: number;
}

export interface PetCreateResponse {
	id: number;
	name: string;
	bio: string | null;
	profilePictureUrl: string | null;
	bornAt: string | null;
	ownerId: number;
	ownerUsername: string;
}
