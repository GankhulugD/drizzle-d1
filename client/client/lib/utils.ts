export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function convertImgbbUrl(url: string | null | undefined): string {
  if (!url) return "/placeholder.svg";
  if (url.includes("ibb.co")) {
    if (url.includes("/image/") || url.includes("/th/")) return url;
    if (url.match(/ibb\.co\/\w+$/)) {
      return url.replace("ibb.co/", "ibb.co/image/");
    }
  }
  return url;
}

export function formatPrice(price: string | number): string {
  return `$${Number(price).toFixed(2)}`;
}
