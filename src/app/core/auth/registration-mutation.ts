import { inject } from '@angular/core'
import { injectMutation } from '@tanstack/angular-query-experimental'
import { lastValueFrom } from 'rxjs'
import { AuthService } from './auth.service'
import { Registration } from './auth.schema'

export const useRegistrationMutation = (user: Registration) => {
  const authService = inject(AuthService)

  return injectMutation(() => ({
    mutationFn: () => lastValueFrom(authService.registration$(user)),
    onSuccess: (data: any) => {
      authService.persistAuth(data);
      // Инвалидируем (обновляем) запрос пользователя, чтобы он подтянул данные
      // queryClient.invalidateQueries({ queryKey: ['user'] });
      // router.navigate(['/dashboard']);
    },
  }))
}
