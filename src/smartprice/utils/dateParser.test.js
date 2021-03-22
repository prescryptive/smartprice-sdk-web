// Copyright 2021 Prescryptive Health Inc
import { getDateOfBirth } from './dateParser';

describe('dateParser', () => {
  it('getDateOfBirth gets a date object from date string', () => {
    expect(getDateOfBirth('2000-01-02')).toEqual(new Date('2000-01-02'));
    expect(getDateOfBirth('2000/08/22')).toEqual(new Date('2000/08/22'));
  })

  it('getDateOfBirth gets null if provided string is not a date format', () => {
    expect(getDateOfBirth('22/08/2000')).toEqual(null);
  })

  it('getDateOfBirth cannot get a date of birth of less than 18 years', () => {
    expect(getDateOfBirth('2015-01-02')).toEqual(null);
  })

  it('getDateOfBirth cannot get a date of birth of more than 65 years', () => {
    expect(getDateOfBirth('1950-01-02')).toEqual(null);
  })
});