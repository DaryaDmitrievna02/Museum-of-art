class BookmarkStorageService {
  getBookmarks(): number[] {
    const bookmarksString = sessionStorage.getItem("bookmarks");
    if (!bookmarksString) {
      this.setBookmarks([]);
      window.dispatchEvent(new Event("bookmarks-updated"));
      return [];
    }
    return JSON.parse(bookmarksString);
  }

  setBookmarks(bookmarks: number[]): void {
    sessionStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    window.dispatchEvent(new Event("bookmarks-updated"));
  }

  addBookmark(bookmark: number): void {
    const bookmarks = this.getBookmarks();
    bookmarks.push(bookmark);
    this.setBookmarks(bookmarks);
  }

  removeBookmark(bookmarkId: number): void {
    const bookmarks = this.getBookmarks().filter(bm => bm !== bookmarkId);
    this.setBookmarks(bookmarks);
  }

  clearBookmarks(): void {
    this.setBookmarks([]);
  }

  hasBookmarksLength(): boolean {
    return this.getBookmarks().length > 0;
  }
}

export const bookmarkStorageService = new BookmarkStorageService();
