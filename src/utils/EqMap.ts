import { ObservableMap } from "mobx";

class EqMap<K, V> extends ObservableMap<K, V> {
  public static isEqual(a, b): boolean {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
      return false;
    }

    for (const aProp of aProps) {
      const propName = aProp;

      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    return true;
  }

  public has(key: K): boolean {
    return Array.from(this.keys()).some(k => EqMap.isEqual(k, key));
  }

  public get(key: K): V | undefined {
    const foundKey = this.findEqualKey(key);
    return foundKey && super.get(foundKey);
  }

  public delete(key: K): boolean {
    const foundKey = this.findEqualKey(key);
    return !!foundKey && super.delete(foundKey);
  }

  private findEqualKey(key: K): K | undefined {
    return Array.from(this.keys()).find(k => EqMap.isEqual(k, key));
  }
}

export default EqMap;
