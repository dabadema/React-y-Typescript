export function formatDate(isoString: string) {
    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return formatter.format(date);
}
