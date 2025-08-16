import { create } from "zustand";

const useAdminStore = create((set) => ({
  loggedIn: false,
  loggedOut: false,
  editor: null,
  elements: [],
  items: [],
  selectedItem: null,
  previewLoading: false,
  elementsLoading: false,

  
  setPreviewLoading: (isLoading => set({ previewLoading: isLoading })),
  setElementsLoading: (isLoading => set({ elementsLoading: isLoading })),
  setLoggedIn: (isLoggedIn => set({ loggedIn: isLoggedIn })),
  setLoggedIn: (isLoggedOut => set({ loggedOut: isLoggedOut })),
  setSelectedItem: (newItem => set({ selectedItem: newItem })),
  setItems: (newItems) => set({ items: newItems }),
  setElements: (newElements) => set({ elements: newElements }),
  updateElementStyle: (index, property, value) =>
    set((state) => {
      const updated = [...state.elements];
      updated[index] = {
        ...updated[index],
        styles: {
          ...updated[index].styles,
          [property]: value,
        },
      };
      return { elements: updated };
    }),
  setEditor: (newVal) => set({ editor: newVal }),
}));

export default useAdminStore;
