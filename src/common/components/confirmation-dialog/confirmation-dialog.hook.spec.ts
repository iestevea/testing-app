import { act, renderHook } from '@testing-library/react-hooks';
import { createEmptyLookup, Lookup } from 'common/models';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('src/common/components/confirmation-dialog/confirmation-dialog.hook.spec.tsx', () => {
  it('should return the default values if no setter is called', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog())

    // Assert
    expect(result.current.isOpen).toBeFalsy();
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('should return isOpen as true if onOpenDialog is called', () => {
    // Arrange
    const item: Lookup = {
      id: '1',
      name: 'item 1'
    }

    // Act
    const { result } = renderHook(() => useConfirmationDialog())

    act(() => {
      result.current.onOpenDialog(item);
    })

    // Assert
    expect(result.current.isOpen).toBeTruthy();
    expect(result.current.itemToDelete).toEqual(item);
  });

  it('should return isOpen as false if onClose is called', () => {
    // Arrange
    const item: Lookup = {
      id: '1',
      name: 'item 1'
    }

    // Act
    const { result } = renderHook(() => useConfirmationDialog())

    act(() => {
      result.current.onOpenDialog(item);
      result.current.onClose();
    })

    // Assert
    expect(result.current.isOpen).toBeFalsy();
  });

  it('should return itemToDelete empty if onAccept is called', () => {
    // Arrange
    const item: Lookup = {
      id: '1',
      name: 'item 1'
    }

    // Act
    const { result } = renderHook(() => useConfirmationDialog())

    act(() => {
      result.current.onOpenDialog(item);
      result.current.onAccept();
    })

    // Assert
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });
});
