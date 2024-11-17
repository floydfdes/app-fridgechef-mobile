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
    createdAt: Date;
    updatedAt: Date;
};


export type Ingredient = {
    name: string;
    amount: string;
};