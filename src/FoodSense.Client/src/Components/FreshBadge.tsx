import { Badge } from "@mantine/core";

interface FreshBadgeProps {
    daysToExpiration: number | undefined;
}

const expiringSoonDays = 7;

export const FreshBadge = (props: FreshBadgeProps) => {
    if (props.daysToExpiration === undefined) {
        return <Badge color="gray">No info</Badge>
    }
    const isExpired = props.daysToExpiration < 0;
    const isExpiringSoon = props.daysToExpiration <= expiringSoonDays;

    if (isExpired) {
        return <Badge color="red">Expired</Badge>
    }

    if (isExpiringSoon) {
        return <Badge color="yellow">Expiring soon</Badge>
    }

    return <Badge color="green">Fresh</Badge>
}
