export const hasUsableUrl = <T extends { url?: string | null }>(
  item: T,
): item is T & { url: string } => Boolean(item.url?.trim());
