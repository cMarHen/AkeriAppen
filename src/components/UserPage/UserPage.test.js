/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserPage from './UserPage';

describe('Userpage component', () => {
  test('should render a Calendar', () => {
    const { container } = render(<UserPage />);
    const calendar = container.querySelector('.react-calendar');

    expect(calendar).toBeInTheDocument();
  });

  test('should render a window to set working time as an input.', async () => {
    const { container } = render(<UserPage />);
    const calendarTile = container.querySelector('.react-calendar__month-view__days__day');

    userEvent.click(calendarTile);

    // Wait for the click
    await waitFor(async () => {
      const input = await screen.findByTestId('time-input-from');
      expect(input).toBeInTheDocument();
    });
  });

  test('should calculate correct time', async () => {
    const { container } = render(<UserPage />);
    const calendarTile = container.querySelector('.react-calendar__month-view__days__day');

    userEvent.click(calendarTile);
    const inputFrom = screen.findByTestId('time-input-from');
    const inputUntil = screen.findByTestId('time-input-until');

    const inputArr = await Promise.all([inputFrom, inputUntil]);

    await userEvent.type(inputArr[0], '06:00');
    await userEvent.type(inputArr[1], '16:06');

    expect(screen.getByTestId('time-total').innerHTML).toBe('10 timmar och 6 minuter.');
  });

  test('should calculate correct time', async () => {
    const { container } = render(<UserPage />);
    const calendarTile = container.querySelector('.react-calendar__month-view__days__day');

    userEvent.click(calendarTile);
    const inputFrom = screen.findByTestId('time-input-from');
    const inputUntil = screen.findByTestId('time-input-until');

    const inputArr = await Promise.all([inputFrom, inputUntil]);

    await userEvent.type(inputArr[0], '22:00');
    await userEvent.type(inputArr[1], '06:00');

    expect(screen.getByTestId('time-total').innerHTML).toBe('8 timmar och 0 minuter.');
  });

  test('should calculate correct time', async () => {
    const { container } = render(<UserPage />);
    const calendarTile = container.querySelector('.react-calendar__month-view__days__day');

    userEvent.click(calendarTile);
    const inputFrom = screen.findByTestId('time-input-from');
    const inputUntil = screen.findByTestId('time-input-until');

    const inputArr = await Promise.all([inputFrom, inputUntil]);

    await userEvent.type(inputArr[0], '16:00');
    await userEvent.type(inputArr[1], '06:06');

    expect(screen.getByTestId('time-total').innerHTML).toBe('14 timmar och 6 minuter.');
  });
});
