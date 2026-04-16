import { Element, Text } from 'html-react-parser';

export const isElement = (element: unknown): element is Element => element instanceof Element;

export const isText = (text: unknown): text is Text => text instanceof Text;
