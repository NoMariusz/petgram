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
}
