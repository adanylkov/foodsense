import { Affix, Button, rem } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { useNavigate } from "react-router"

export const FloatingButton = () => {

    const navigate = useNavigate();

    return (
        <Affix position={{ bottom: rem(20), right: rem(20) }}>
            <Button
                leftIcon={<IconPlus size="1rem" />}
                onClick={() => navigate('/add')}>
                Add new food
            </Button>
        </Affix>
    )
}
