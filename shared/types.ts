// types.ts
export type Recipe = {
    _id: string;
    name: string;
    category: string;
    cuisine: string;
    difficulty: string;
    imageUrl: string;
    rating: number;
    ingredients: Array<{
        name: string;
        amount: string;
    }>;
    instructions: string;
    createdBy: string;
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