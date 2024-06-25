export function timeAgo(dateParam) {
    const date =
        typeof dateParam === "object" ? dateParam : new Date(dateParam);
    const now = new Date();
    const secondsPast = (now.getTime() - date.getTime()) / 1000;
    if (secondsPast < 1) {
        return "방금 전";
    }
    if (secondsPast < 60) {
        return parseInt(secondsPast) + "초 전";
    }
    if (secondsPast < 3600) {
        return parseInt(secondsPast / 60) + "분 전";
    }
    if (secondsPast <= 86400) {
        return parseInt(secondsPast / 3600) + "시간 전";
    }
    if (secondsPast > 86400) {
        const day = parseInt(secondsPast / 86400);
        return day + "일 전";
    }
}
