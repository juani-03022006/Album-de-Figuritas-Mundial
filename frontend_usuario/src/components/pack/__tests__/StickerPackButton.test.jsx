import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { StickerPackButton } from '../StickerPackButton.jsx';

describe('frontend_usuario/components/pack/StickerPackButton', () => {
  it('muestra el boton dorado usable cuando hay paquete disponible', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <StickerPackButton
        estado={{ disponible: true, milisegundosRestantes: 0 }}
        isLoading={false}
        onClick={onClick}
      />
    );

    const button = screen.getByRole('button', { name: /paquete disponible/i });
    expect(button).toBeEnabled();

    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('deshabilita el boton y muestra tiempo restante cuando no hay paquete disponible', () => {
    render(
      <StickerPackButton
        estado={{ disponible: false, milisegundosRestantes: 90 * 60 * 1000 }}
        isLoading={false}
        onClick={vi.fn()}
      />
    );

    const button = screen.getByRole('button', { name: /paquete en 1h 30m/i });
    expect(button).toBeDisabled();
  });
});
