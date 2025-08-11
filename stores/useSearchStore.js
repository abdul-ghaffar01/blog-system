import {create} from "zustand";

const useSearchStore = create((set) => ({
    query: "",
    results: [],
    loading: false,
    searching: false,

    setQuery: (newQuery) => set({ query: newQuery }),
    setResults: (newResults) => set({ results: newResults }),
    setLoading: (isLoading) => set({ loading: isLoading }),
    clearResults: () => set({ results: [] }),
    setSearching: (isSearching) => set({searching: isSearching})
}));

export default useSearchStore;
