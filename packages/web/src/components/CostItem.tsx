import React, { memo } from "react"
import dayjs from "dayjs"
import { navigate } from "@reach/router"

import styled from "../application/theme"
import { AllCosts } from "../graphql/types"
import { round } from "../lib/helpers"

import IconOpen from "../assets/images/icon-open.svg"
import IconRepeat from "../assets/images/icon-repeat.svg"
import IconClock from "../assets/images/icon-clock.svg"

import Column from "./styled/Column"
import Avatar from "./Avatar"
import Center from "./styled/Center"

type CostProps = {
  cost: AllCosts.AllCosts
}

function CostItem({ cost }: CostProps) {
  return (
    <StyledCost onClick={() => navigate(`/costs/${cost.id}`)} tabIndex={0}>
      <Column flex={5}>
        <StyledName>
          {cost.name}
          {cost.recurring !== "one-off" && (
            <StyledInfoIcon src={IconRepeat} width={30} />
          )}
          {dayjs(cost.date).isAfter(dayjs().startOf("day")) && (
            <StyledInfoIcon src={IconClock} width={25} />
          )}
        </StyledName>
      </Column>
      <Column flex={5}>€ {round(cost.amount * 0.01, 2)}</Column>
      <Column flex={5}>
        <Avatar user={cost.payer} size={40} />
      </Column>
      <Column flex={5}>{dayjs(cost.date).format("DD MMM 'YY")}</Column>
      <Column flex={3}>
        <Center>
          <StyledIcon src={IconOpen} width={10} />
        </Center>
      </Column>
    </StyledCost>
  )
}

export default memo(CostItem)

const StyledName = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const StyledIcon = styled.img``

const StyledInfoIcon = styled.img`
  padding-left: ${p => p.theme.paddingS};
`

const StyledCost = styled.div`
  width: 100%;
  padding-right: 0;
  border: 2px solid transparent;
  padding: ${p => p.theme.paddingL};
  border-radius: ${p => p.theme.borderRadius};
  ${p => p.theme.flexCenter};

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px 5px rgba(200, 200, 200, 0.1);

    ${StyledIcon} {
      transition: 200ms all;
      transform: translateX(5px);
    }
  }
`
