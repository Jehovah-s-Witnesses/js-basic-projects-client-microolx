import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';

export const ajv = new Ajv({ allErrors: true });
ajvFormats(ajv);
