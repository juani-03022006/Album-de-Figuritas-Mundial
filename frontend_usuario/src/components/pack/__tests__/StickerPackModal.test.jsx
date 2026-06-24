import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { StickerPackModal } from '../StickerPackModal.jsx';

describe('frontend_usuario/components/pack/StickerPackModal', () => {
  it('no renderiza nada cuando el modal esta cerrado', () => {
    const { container } = render(<StickerPackModal isOpen={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('permite abrir el paquete desde el modal', async () => {
    const user = userEvent.setup();
    const onOpenPack = vi.fn();

    render(
      <StickerPackModal
        isOpen
        isOpening={false}
        error={null}
        paqueteAbierto={null}
        onOpenPack={onOpenPack}
        onClose={vi.fn()}
      />
    );

    await user.click(screen.getByRole('button', { name: /^abrir$/i }));

    expect(onOpenPack).toHaveBeenCalledTimes(1);
  });

  it('lista las 7 figuritas obtenidas con numero, nombre y estado', () => {
    const figuritas = Array.from({ length: 7 }, (_, index) => ({
      id: index + 1,
      nroFigurita: index + 1,
      nombre: `Figurita ${index + 1}`,
      tipo: index === 0 ? 'escudo' : 'jugador',
      yaLaTenia: index === 1,
      seleccion: { nombre: 'ARGENTINA' },
    }));

    render(
      <StickerPackModal
        isOpen
        isOpening={false}
        error={null}
        paqueteAbierto={{ figuritas }}
        onOpenPack={vi.fn()}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText(/#1 · Figurita 1/i)).toBeInTheDocument();
    expect(screen.getByText(/#7 · Figurita 7/i)).toBeInTheDocument();
    expect(screen.getAllByText(/nueva/i)).toHaveLength(6);
    expect(screen.getByText(/repetida/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^abrir$/i })).not.toBeInTheDocument();
  });
});
