import {
    UseSortByColumnProps,
    UseSortByColumnOptions,
    UseSortByInstanceProps,
    UseSortByOptions,
    UseSortByState,
    HeaderGroup,
  } from "react-table";
  
  declare module "react-table" {
    export interface TableOptions<D extends Record<string, unknown>>
      extends UseSortByOptions<D> {}
  
    export interface Hooks<D extends Record<string, unknown> = Record<string, unknown>> {
      useSortBy?: Array<PluginHook<D>>;
    }
  
    export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
      extends UseSortByInstanceProps<D> {}
  
    export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
      extends UseSortByState<D> {}
  
    export interface ColumnInterface<D extends Record<string, unknown> = Record<string, unknown>>
      extends UseSortByColumnOptions<D> {}
  
    export interface ColumnInstance<D extends Record<string, unknown> = Record<string, unknown>>
      extends UseSortByColumnProps<D> {}
  
    export interface HeaderGroup<D extends Record<string, unknown> = Record<string, unknown>>
      extends Record<string, any> {}
  }
  