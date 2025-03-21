export interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    cover: string;
    rating: string;
    published: number;
    buy: {
      amazon: string;
      iBooks: string;
      playStore: string;
    };
  }