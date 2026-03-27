import { ICodeName } from "./base/code-name";
import { ICategory } from "./category";
import { IImage } from "./image";
import { IPropertyAll, IPropertyResponse, IPropertyTemplate } from "./property";

// Model produktu wykorzystywany po stronie frontendu.
// Interfejs definiuje strukturę obiektu produktu (IProduct),
// który jest używany do komunikacji z API oraz w warstwie prezentacji aplikacji.
export interface IProduct extends ICodeName, IPropertyAll {
  category: ICategory; // Kategoria, do której należy produkt (np. elektronika, odzież, kosmetyki).
  type: ICodeName;  // Typ produktu. Dziedziczy z interfejsu ICodeName (np. code: "PHONE", name: "Smartfon").
  brand: ICodeName; // Marka  produktu. Dziedziczy z interfejsu ICodeName.
  price: number; // Cena podstawowa produktu (wartość liczbowo wyrażona w walucie systemowej).
  discountedPrice?: number;  // Cena promocyjna (pole opcjonalne, może być pominięte, jeśli brak zniżki).
  count: number; // Ilość dostępnych sztuk produktu w magazynie.
  description: string; // Opis tekstowy produktu – może zawierać szczegóły techniczne lub marketingowe.
  images: IImage[]; // Tablica obiektów typu IImage, zawierająca dane zdjęć produktu.
}

export interface IProductResponse extends IPropertyResponse, IProduct {
  propertyTemplate?: IPropertyTemplate;
}