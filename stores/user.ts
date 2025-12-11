import { UserType } from "@/interfaces/User";
import { create } from "zustand";

interface UserStore {
  currentUser: UserType;
  setCurrentUser: (newUser: UserType) => void;
}

export default create<UserStore>()((set) => ({
  currentUser: { id: "", email: "", fullName: "" },
  setCurrentUser: (newUser) => set(() => ({ currentUser: newUser })),
}));
