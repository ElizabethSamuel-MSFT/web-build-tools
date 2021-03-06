// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { ApiItemKind } from '../items/ApiItem';
import { IApiDeclaredItemOptions, ApiDeclaredItem } from '../items/ApiDeclaredItem';
import { IApiParameterListMixinOptions, ApiParameterListMixin } from '../mixins/ApiParameterListMixin';
import { IApiReleaseTagMixinOptions, ApiReleaseTagMixin } from '../mixins/ApiReleaseTagMixin';
import { IApiReturnTypeMixinOptions, ApiReturnTypeMixin } from '../mixins/ApiReturnTypeMixin';
import { IApiNameMixinOptions, ApiNameMixin } from '../mixins/ApiNameMixin';
import { IApiTypeParameterListMixinOptions, ApiTypeParameterListMixin } from '../mixins/ApiTypeParameterListMixin';

/**
 * Constructor options for {@link ApiFunction}.
 * @public
 */
export interface IApiFunctionOptions extends
  IApiNameMixinOptions,
  IApiTypeParameterListMixinOptions,
  IApiParameterListMixinOptions,
  IApiReleaseTagMixinOptions,
  IApiReturnTypeMixinOptions,
  IApiDeclaredItemOptions {
}

/**
 * Represents a TypeScript function declaration.
 *
 * @remarks
 *
 * This is part of the {@link ApiModel} hierarchy of classes, which are serializable representations of
 * API declarations.
 *
 * `ApiFunction` represents a TypeScript declaration such as this example:
 *
 * ```ts
 * export function getAverage(x: number, y: number): number {
 *   return (x + y) / 2.0;
 * }
 * ```
 *
 * Functions are exported by an entry point module or by a namespace.  Compare with {@link ApiMethod}, which
 * represents a function that is a member of a class.
 *
 * @public
 */
export class ApiFunction extends ApiNameMixin(ApiTypeParameterListMixin(ApiParameterListMixin(ApiReleaseTagMixin(
  ApiReturnTypeMixin(ApiDeclaredItem))))) {

  public static getContainerKey(name: string, overloadIndex: number): string {
    return `${name}|${ApiItemKind.Function}|${overloadIndex}`;
  }

  public constructor(options: IApiFunctionOptions) {
    super(options);
  }

  /** @override */
  public get kind(): ApiItemKind {
    return ApiItemKind.Function;
  }

  /** @override */
  public get containerKey(): string {
    return ApiFunction.getContainerKey(this.name, this.overloadIndex);
  }
}
