class EqMap<K, V> extends Map<K, V> {
  public static isEqual(a, b): boolean {
    // Create arrays of property names
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
      return false;
    }

    for (const aProp of aProps) {
      const propName = aProp;

      // If values of same property are not equal,
      // objects are not equivalent
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
    return Array.from(this.keys()).find(k =>
      EqMap.isEqual(k, key)
    );
  }
}

export default EqMap;
