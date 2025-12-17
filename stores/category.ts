import { create } from "zustand";

export interface CategoryItem {
  name: string;
  id: string;
}

interface CategoryStore {
  categoryItems: CategoryItem[];
  selectedCategory: string;
  setCategoryItems: (newCategoryItems: CategoryItem[]) => void;
  changeSelectedCategory: (selectedCategory: string) => void;
}

export default create<CategoryStore>()((set) => ({
  categoryItems: [],
  selectedCategory: "",
  setCategoryItems: (newCategoryItems) =>
    set(() => ({
      categoryItems: newCategoryItems,
    })),
  changeSelectedCategory: (selectedCategory: string) =>
    set(() => {
      if (selectedCategory === "uncategory") {
        return { selectedCategory: "Uncategorized" };
      }
      return {
        selectedCategory:
          selectedCategory &&
          selectedCategory.charAt(0).toUpperCase() +
            selectedCategory.toLowerCase().slice(1),
      };
    }),
}));
