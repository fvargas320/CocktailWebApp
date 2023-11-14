/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Flex, Text } from "@aws-amplify/ui-react";
import Star from "./Star";
export default function Review(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="16px"
      direction="column"
      width="395px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      borderRadius="8px"
      padding="16px 16px 16px 16px"
      backgroundColor="rgba(28,28,30,1)"
      {...getOverrideProps(overrides, "Review")}
      {...rest}
    >
      <Flex
        gap="16px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "ReviewHeader")}
      >
        <Flex
          gap="10px"
          direction="column"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          grow="1"
          shrink="1"
          basis="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "ReviewHeaderLeft")}
        >
          <Flex
            gap="0"
            direction="column"
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="center"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "ReviewTitle")}
          >
            <Text
              fontFamily="SF Pro Display"
              fontSize="18px"
              fontWeight="600"
              color="rgba(255,255,255,1)"
              lineHeight="21.48046875px"
              textAlign="left"
              display="block"
              direction="column"
              justifyContent="unset"
              width="unset"
              height="unset"
              gap="unset"
              alignItems="unset"
              shrink="0"
              alignSelf="stretch"
              position="relative"
              padding="0px 0px 0px 0px"
              whiteSpace="pre-wrap"
              children="Great cocktail! rich, simple and quick to prepare"
              {...getOverrideProps(
                overrides,
                "Great cocktail! rich, simple and quick to prepare"
              )}
            ></Text>
          </Flex>
          <Flex
            gap="3px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="center"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "RateStar")}
          >
            <Flex
              gap="6px"
              direction="row"
              width="unset"
              height="unset"
              justifyContent="center"
              alignItems="flex-start"
              overflow="hidden"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              {...getOverrideProps(overrides, "IconStar")}
            >
              <Star
                width="22px"
                height="22px"
                display="block"
                gap="unset"
                alignItems="unset"
                justifyContent="unset"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                fill="yes"
                {...getOverrideProps(overrides, "star391673")}
              ></Star>
              <Star
                width="22px"
                height="22px"
                display="block"
                gap="unset"
                alignItems="unset"
                justifyContent="unset"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                fill="yes"
                {...getOverrideProps(overrides, "star391674")}
              ></Star>
              <Star
                width="22px"
                height="22px"
                display="block"
                gap="unset"
                alignItems="unset"
                justifyContent="unset"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                fill="yes"
                {...getOverrideProps(overrides, "star391675")}
              ></Star>
              <Star
                width="22px"
                height="22px"
                display="block"
                gap="unset"
                alignItems="unset"
                justifyContent="unset"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                fill="yes"
                {...getOverrideProps(overrides, "star391676")}
              ></Star>
              <Star
                width="22px"
                height="22px"
                display="block"
                gap="unset"
                alignItems="unset"
                justifyContent="unset"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                fill="no"
                {...getOverrideProps(overrides, "star391677")}
              ></Star>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          gap="13px"
          direction="column"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-end"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "ReviewHeaderRight")}
        >
          <Flex
            gap="0"
            direction="column"
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="center"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "ReviewDate")}
          >
            <Text
              fontFamily="SF Pro Display"
              fontSize="16px"
              fontWeight="400"
              color="rgba(138,138,141,1)"
              lineHeight="19.09375px"
              textAlign="right"
              display="block"
              direction="column"
              justifyContent="unset"
              width="unset"
              height="unset"
              gap="unset"
              alignItems="unset"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              whiteSpace="pre-wrap"
              children="1d ago"
              {...getOverrideProps(overrides, "1d ago")}
            ></Text>
          </Flex>
          <Flex
            gap="0"
            direction="column"
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="center"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "NickName")}
          >
            <Text
              fontFamily="SF Pro Text"
              fontSize="16px"
              fontWeight="400"
              color="rgba(138,138,141,1)"
              lineHeight="19.09375px"
              textAlign="right"
              display="block"
              direction="column"
              justifyContent="unset"
              width="unset"
              height="unset"
              gap="unset"
              alignItems="unset"
              shrink="0"
              position="relative"
              padding="0px 0px 0px 0px"
              whiteSpace="pre-wrap"
              children="Nick Name"
              {...getOverrideProps(overrides, "Nick Name")}
            ></Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        gap="0"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Review391683")}
      >
        <Text
          fontFamily="SF Pro Text"
          fontSize="18px"
          fontWeight="400"
          color="rgba(255,255,255,1)"
          lineHeight="25.19999885559082px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="I enjoy using this app every day. I get very happy when I get notifications from my friends and I open the app immediately. Thank you for I enjoy using this app every day. I get very happy when I get notifications from my friends and I open the app immediately. Thank you for I enjoy using this app every day. I get very happy when I get notifications... see more"
          {...getOverrideProps(
            overrides,
            "I enjoy using this app every day. I get very happy when I get notifications from my friends and I open the app immediately. Thank you for I enjoy using this app every day. I get very happy when I get notifications from my friends and I open the app immediately. Thank you for I enjoy using this app every day. I get very happy when I get notifications... see more"
          )}
        ></Text>
      </Flex>
    </Flex>
  );
}
