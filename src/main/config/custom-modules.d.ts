declare module Express {
  interface Request {
    data: { tokenUserId?: string }
  }
}
