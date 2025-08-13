import {create} from "zustand";

const useSearchStore = create((set) => ({
    searching: false,

    setSearching: (isSearching) => set({searching: isSearching})
}));

export default useSearchStore;
