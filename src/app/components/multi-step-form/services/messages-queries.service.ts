import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import { injectQuery } from '@tanstack/angular-query-experimental'
import { lastValueFrom } from 'rxjs'
import { environment } from '../../../../environments/environment'

export const useEmailTemplateQuery = () => {
  const http = inject(HttpClient)

  return injectQuery(() => ({
    queryKey: ['email-template'],
    queryFn: () =>
      lastValueFrom(
        http.get<string>(`${environment.baseUrl}EmailTemplate/templates`),
      ),
    enabled: false,
  }))
}
