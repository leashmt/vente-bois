export const m2 = (hauteur, largeur, profondeur) => {
  if (largeur < 1000) {
    return hauteur * largeur * profondeur * 2;
  }
  return hauteur * largeur * profondeur * 3;
};
