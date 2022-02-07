export function dateFormat(date) {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: 'numeric', minute: 'numeric', second: 'numeric',
    }).format(new Date(date))
  }