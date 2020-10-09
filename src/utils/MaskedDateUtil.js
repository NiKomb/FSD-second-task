class MaskedDateUtil {
  static setMask(value) {
    const validatedValue = [...value].reduce((acc, char, index) => {
      if (index < 10 && char.match(/[0-9]/)) return acc + char;
      return acc;
    }, "");

    let result = "";
    for (let i = 0; i < validatedValue.length; i++) {
      if (i === 2 || i === 4) result += ".";
      result += validatedValue[i];
    }
    return result;
  }
}

export default MaskedDateUtil;
