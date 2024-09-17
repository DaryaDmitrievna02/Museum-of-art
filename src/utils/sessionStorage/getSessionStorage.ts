export function getSessionStorage() {
  const bookmarksString = sessionStorage.getItem("bookmarks");
  if (!bookmarksString) {
    sessionStorage.setItem("bookmarks", JSON.stringify([]));
    window.dispatchEvent(new Event("bookmarks-updated"));
  }
  const bookmarks = bookmarksString ? JSON.parse(bookmarksString) : [];
  return bookmarks;
}

