import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  ConfirmationDialogComponent,
  Props,
} from './confirmation-dialog.component';

describe('src/common/components/confirmation-dialog/confirmation-dialog.component.spec.tsx', () => {
  it('should not display any element if isOpen is false', () => {
    // Arrange
    const props: Props = {
      isOpen: false,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'This is the title',
      labels: {
        closeButton: 'Cerrar',
        acceptButton: 'Aceptar',
      },
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    const titleElements = screen.queryAllByRole('heading');
    const buttonElements = screen.queryAllByRole('button');

    // Assert
    expect(titleElements).toHaveLength(0);
    expect(buttonElements).toHaveLength(0);
  });

  it('should display title, content and actions if isOpen is true', () => {
    // Arrange
    const props: Props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'This is the title',
      labels: {
        closeButton: 'Cerrar',
        acceptButton: 'Aceptar',
      },
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    const titleElement = screen.getByText(props.title as string);
    const acceptButtonElement = screen.getByText(props.labels.acceptButton);
    const closeButtonElement = screen.getByText(props.labels.closeButton);

    // Assert
    expect(titleElement).toBeInTheDocument();
    expect(acceptButtonElement).toBeInTheDocument();
    expect(closeButtonElement).toBeInTheDocument();
  });

  it('should call onAccept if accept button is clicked', () => {
    // Arrange
    const props: Props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'This is the title',
      labels: {
        closeButton: 'Cerrar',
        acceptButton: 'Aceptar',
      },
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    const acceptButtonElement = screen.getByText(props.labels.acceptButton);
    fireEvent.click(acceptButtonElement);

    // Assert
    expect(props.onAccept).toBeCalled();
  });

  it('should call onClose if close button is clicked', () => {
    // Arrange
    const props: Props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'This is the title',
      labels: {
        closeButton: 'Cerrar',
        acceptButton: 'Aceptar',
      },
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    const closeButtonElement = screen.getByText(props.labels.closeButton);
    fireEvent.click(closeButtonElement);

    // Assert
    expect(props.onClose).toBeCalled();
  });
});
