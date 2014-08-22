macro c_eval {
    case { _($things...) } => {
        var res = #{ $things... }.map(unwrapSyntax).join(' ')
        return [makeValue(eval(res), 0)]
    }
}
export c_eval
