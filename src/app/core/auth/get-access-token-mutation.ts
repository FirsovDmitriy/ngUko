import { inject } from '@angular/core'
import { injectMutation } from '@tanstack/angular-query-experimental'
import { lastValueFrom } from 'rxjs'
import { AuthService } from './auth.service'

export const useGetAccessTokenMutation = (refreshToken: string) => {
  const authService = inject(AuthService)

  return injectMutation(() => ({
    mutationFn: () => lastValueFrom(authService.getAccessToken$(refreshToken)),
    onSuccess: (data: any) => {
      authService.persistAuth(data);
      // Инвалидируем (обновляем) запрос пользователя, чтобы он подтянул данные
      // queryClient.invalidateQueries({ queryKey: ['user'] });
      // router.navigate(['/dashboard']);
    },
  }))
}
