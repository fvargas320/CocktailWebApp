/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
import { StarProps } from "./Star";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReviewOverridesProps = {
    Review?: PrimitiveOverrideProps<FlexProps>;
    ReviewHeader?: PrimitiveOverrideProps<FlexProps>;
    ReviewHeaderLeft?: PrimitiveOverrideProps<FlexProps>;
    ReviewTitle?: PrimitiveOverrideProps<FlexProps>;
    "Great cocktail! rich, simple and quick to prepare"?: PrimitiveOverrideProps<TextProps>;
    RateStar?: PrimitiveOverrideProps<FlexProps>;
    IconStar?: PrimitiveOverrideProps<FlexProps>;
    star391673?: StarProps;
    star391674?: StarProps;
    star391675?: StarProps;
    star391676?: StarProps;
    star391677?: StarProps;
    ReviewHeaderRight?: PrimitiveOverrideProps<FlexProps>;
    ReviewDate?: PrimitiveOverrideProps<FlexProps>;
    "1d ago"?: PrimitiveOverrideProps<TextProps>;
    NickName?: PrimitiveOverrideProps<FlexProps>;
    "Nick Name"?: PrimitiveOverrideProps<TextProps>;
    Review391683?: PrimitiveOverrideProps<FlexProps>;
    "I enjoy using this app every day. I get very happy when I get notifications from my friends and I open the app immediately. Thank you for I enjoy using this app every day. I get very happy when I get notifications from my friends and I open the app immediately. Thank you for I enjoy using this app every day. I get very happy when I get notifications... see more"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type ReviewProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: ReviewOverridesProps | undefined | null;
}>;
export default function Review(props: ReviewProps): React.ReactElement;
