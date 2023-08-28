import { Button, ButtonProps } from "@mantine/core"
import { IconChevronLeft } from "@tabler/icons-react"
import { Link } from "react-router-dom"

export const GoBackButton = (props: ButtonProps) => {
  return (
    <Link to="/">
        <Button mb={'xl'} color="blue" size="sm" leftIcon={<IconChevronLeft />} radius={'xl'} {...props}>
            Go back
        </Button>
    </Link>
  )
}
