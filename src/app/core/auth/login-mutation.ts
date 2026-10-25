import { inject } from '@angular/core'
import { injectMutation } from '@tanstack/angular-query-experimental'
import { lastValueFrom } from 'rxjs'
import { AuthService } from './auth.service'
import { LoginRequest } from './auth.schema'

export const useLoginMutation = (payload: LoginRequest) => {
  const authService = inject(AuthService)

  return injectMutation(() => ({
    mutationFn: () => lastValueFrom(authService.login$(payload)),
    onSuccess: (data: any) => {
      authService.persistAuth(data);
      // Инвалидируем (обновляем) запрос пользователя, чтобы он подтянул данные
      // queryClient.invalidateQueries({ queryKey: ['user'] });
      // router.navigate(['/dashboard']);
    },
  }))
}
