// types.ts
export type Recipe = {
    _id: string;
    category: string;
    name: string;
    imageUrl: string;
    cuisine: string;
    rating: number;
    difficulty: string;
    createdBy: string
};

export type UserProfile = {
    name: string;
    email: string;
    password: string;
    profilePicture?: string;
    bio?: string;
    recipesCount: number;
    followersCount: number;
    followingCount: number;
    createdAt: Date;  // added due to timestamps option in Mongoose schema
    updatedAt: Date;  // added due to timestamps option in Mongoose schema
};
