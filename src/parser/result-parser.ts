import * as _ from 'lodash';
import { IResult, Result } from '.././model/result';

/**
 * Utility function to parse line and create <code>IResult</code>.
 * Throws any errors for caller to handle.
 *
 * @param line Result record
 */
export function parseResultRow(line: string): IResult {
  const parts: Array<string> = line.split(':');

  try {
    // Parse line
    const positions: Array<number> = [parts[1], parts[2], parts[3]].map((item) => parseInt(item, 10));

    // Run validations.
    if (_.isEmpty(positions) || positions.length < 3) {
      throw new Error(line + ' is not entered in required format.');
    }

    // Return result.
    return new Result(positions[0], positions[1], positions[2]);
  } catch (error) {
    const msg = error ? error : line + ' is not entered in required format.';
    throw new Error(msg);
  }
}