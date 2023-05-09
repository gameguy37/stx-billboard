
;; billboard v1

;; error consts
(define-constant ERR_INVALID_STRING u0)

;; data maps/vars
(define-data-var billboard-message (string-utf8 500) u"Hello World!")

;; public functions
(define-read-only (get-message)
    (var-get billboard-message)
)

(define-public (set-message (message (string-utf8 500)))
    (if (var-set billboard-message message)
        (ok true)
        (err ERR_INVALID_STRING)
    )
)
