// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { ApiItemKind } from '../items/ApiItem';
import { IApiDeclaredItemOptions, ApiDeclaredItem } from '../items/ApiDeclaredItem';
import { IApiParameterListMixinOptions, ApiParameterListMixin } from '../mixins/ApiParameterListMixin';
import { IApiReleaseTagMixinOptions, ApiReleaseTagMixin } from '../mixins/ApiReleaseTagMixin';
import { IApiReturnTypeMixinOptions, ApiReturnTypeMixin } from '../mixins/ApiReturnTypeMixin';
import { IApiTypeParameterListMixinOptions, ApiTypeParameterListMixin } from '../mixins/ApiTypeParameterListMixin';

/**
 * Constructor options for {@link ApiCallSignature}.
 * @public
 */
export interface IApiCallSignatureOptions extends
  IApiTypeParameterListMixinOptions,
  IApiParameterListMixinOptions,
  IApiReleaseTagMixinOptions,
  IApiReturnTypeMixinOptions,
  IApiDeclaredItemOptions {
}

/**
 * Represents a TypeScript function call signature.
 *
 * @remarks
 *
 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
 * API declarations.
 *
 * `ApiCallSignature` represents a TypeScript declaration such as `(x: number, y: number): number`
 * in this example:
 *
 * ```ts
 * export interface IChooser {
 *   // A call signature:
 *   (x: number, y: number): number;
 *
 *   // Another overload for this call signature:
 *   (x: string, y: string): string;
 * }
 *
 * function chooseFirst<T>(x: T, y: T): T {
 *   return x;
 * }
 *
 * let chooser: IChooser = chooseFirst;
 * ```
 *
 * @public
 */
export class ApiCallSignature extends ApiTypeParameterListMixin(ApiParameterListMixin(ApiReleaseTagMixin(
  ApiReturnTypeMixin(ApiDeclaredItem)))) {

  public static getContainerKey(overloadIndex: number): string {
    return `|${ApiItemKind.CallSignature}|${overloadIndex}`;
  }

  public constructor(options: IApiCallSignatureOptions) {
    super(options);
  }

  /** @override */
  public get kind(): ApiItemKind {
    return ApiItemKind.CallSignature;
  }

  /** @override */
  public get containerKey(): string {
    return ApiCallSignature.getContainerKey(this.overloadIndex);
  }
}
