# RF-013 — Notificaciones, Recordatorios y Alertas Masivas

<!--
  ¿Qué? Requisito funcional para el envío de correos electrónicos transaccionales y notificaciones del sistema.
  ¿Para qué? Mantener informados a los clientes de sus citas y permitir al administrador enviar comunicados.
  ¿Impacto? Reduce el ausentismo de clientes y mejora la comunicación comercial.
-->

---

## Identificación

| Campo | Valor |
| :--- | :--- |
| **ID** | RF-013 |
| **Nombre** | Notificaciones, Recordatorios y Alertas Masivas |
| **Módulo** | Notificaciones y Comunicaciones |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **HUs Asociadas** | HU-20, HU-21, HU-22 |
| **Fecha** | Febrero 2026 |

---

## Descripción

El sistema debe enviar recordatorios por correo electrónico cuando se crea o modifica una cita, emitir alertas en el panel del administrador cuando ocurre una cancelación y permitir el envío de avisos y promociones a la base de clientes.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
| :--- | :--- | :--- | :--- |
| `destinatario` | Texto (Email) | Sí | Correo electrónico válido |
| `asunto` | Texto | Sí | Mínimo 5 caracteres |
| `mensaje` | Texto / HTML | Sí | Cuerpo del mensaje |

---

## Proceso

1. Al confirmarse un evento (agendamiento, cancelación o aviso masivo), el backend instancia la conexión SMTP con `smtplib`.
2. Compone el mensaje MIME (`multipart/alternative`) con soporte de texto plano y HTML.
3. Envía el correo al servidor SMTP configurado (Mailpit en desarrollo o servidor corporativo en producción).

---

## Endpoints Asociados

| Método | Ruta | Auth Requerida | Descripción |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/citas` | Sí | Dispara notificación automática de cita |
| `POST` | `/api/password/forgot` | No | Dispara correo de recuperación |
