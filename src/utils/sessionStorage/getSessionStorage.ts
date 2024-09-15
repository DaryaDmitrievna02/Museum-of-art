export function getSessionStorage() {
  let bookmarksString = sessionStorage.getItem("bookmarks");
  if (!bookmarksString) {
    sessionStorage.setItem("bookmarks", JSON.stringify([]));
    window.dispatchEvent(new Event("bookmarks-updated"));
  }
  let bookmarks = bookmarksString ? JSON.parse(bookmarksString) : [];
  return bookmarks;
}
