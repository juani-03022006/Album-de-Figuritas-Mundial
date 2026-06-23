import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { LoginScreen } from '../LoginScreen.jsx';

describe('frontend_usuario/components/auth/LoginScreen', () => {
  it('muestra error y ejecuta acciones de login y registro', async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn();
    const onRegister = vi.fn();

    render(
      <LoginScreen
        error="No se pudo validar la sesión"
        onLogin={onLogin}
        onRegister={onRegister}
      />
    );

    expect(screen.getByText(/No se pudo validar la sesión/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    await user.click(screen.getByRole('button', { name: /crear cuenta/i }));

    expect(onLogin).toHaveBeenCalledTimes(1);
    expect(onRegister).toHaveBeenCalledTimes(1);
  });
});
