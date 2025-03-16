import {
  defineStore as _defineStore,
  StoreDefinition,
  Store, StateTree, _GettersTree, DefineStoreOptions,
  _ExtractStateFromSetupStore,
  _ExtractGettersFromSetupStore,
  _ExtractActionsFromSetupStore,
} from 'pinia';

type _Method = (...args: any[]) => any;

interface SetupStoreHelpers {
  action: <Fn extends _Method>(fn: Fn) => Fn;
}

/**
 * 和 pinia 的 defineStore 一样，定义【Setup Store】的重载签名：
 */

export default function defineStore<Id extends string, SS>(id: Id,
  storeSteup: (helpers: SetupStoreHelpers) => SS,
  persist?: boolean
): StoreDefinition<
  Id,
  _ExtractStateFromSetupStore<SS>,
  _ExtractGettersFromSetupStore<SS>,
  _ExtractActionsFromSetupStore<SS>
>


export default function defineStore<Id extends string, S extends StateTree = {}, G extends _GettersTree<S> = {}, A = {}>(id: Id, options: Omit<DefineStoreOptions<Id, S, G, A>, 'id'>,
): StoreDefinition<Id, S, G, A>;

export default function defineStore(
  id: any,
  storeSteup: any,
  persist?: any
) {
  return _defineStore(
    id,
    storeSteup,
    persist
      ? {
        persist: {
          key: id,
          storage: localStorage,
        },
      }
      : undefined
  );
}
